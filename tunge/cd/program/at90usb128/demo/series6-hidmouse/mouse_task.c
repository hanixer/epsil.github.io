/*This file has been prepared for Doxygen automatic documentation generation.*/
//! \file *********************************************************************
//!
//! \brief This file manages the Mouse task.
//!
//! - Compiler:           IAR EWAVR and GNU GCC for AVR
//! - Supported devices:  AT90USB1287, AT90USB1286, AT90USB647, AT90USB646
//!
//! \author               Atmel Corporation: http://www.atmel.com \n
//!                       Support and FAQ: http://support.atmel.no/
//!
//! ***************************************************************************

/* Copyright (c) 2007, Atmel Corporation All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. The name of ATMEL may not be used to endorse or promote products derived
 * from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY ATMEL ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE EXPRESSLY AND
 * SPECIFICALLY DISCLAIMED. IN NO EVENT SHALL ATMEL BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

//_____  I N C L U D E S ___________________________________________________

#include "config.h"
#include "conf_usb.h"

#include "mouse_task.h"
#include "usb_descriptors.h"

#include "lib_mcu/usb/usb_drv.h"
#include "lib_mcu/adc/adc_drv.h"
#include "lib_mcu/wdt/wdt_drv.h"
#include "lib_mcu/power/power_drv.h"

#include "modules/usb/device_chap9/usb_standard_request.h"

#include "sensors.h"

//_____ D E C L A R A T I O N S ____________________________________________

//! Used to flag a report ready to send
Bool  g_b_send_report;
//! Used to flag a ack report ready to send
Bool  g_b_send_ack_report;
//! Used to store the HID mouse report
U8    g_hid_mouse_report[4];
#if (TARGET_BOARD==STK525)
//! Used to store the HID mouse report
U16 g_u16_pos_scroll;
#endif
//! Used to count the number of SOF and create a timer counter
volatile U8 g_u8_cpt_sof;

//! Reference level for steps, defined in sensors.c
extern U8 Zerovalue[8];

//_____ D E F I N I T I O N S _______________________________________________

//! This function initializes the hardware/software resources required for mouse task.
//!
void mouse_task_init(void)
{
   // Init SOF
   g_u8_cpt_sof=0;
   Usb_enable_sof_interrupt();

   // Init interface board
   Joy_init();
   Hwb_button_init();
   Leds_init();
   Led1_on();
   Led0_off();
#if (TARGET_BOARD==STK525)
   init_adc();
   g_u16_pos_scroll=Get_adc_pot_val();
#endif

   // Send a ack report at startup
   g_b_send_report      = FALSE;
   g_b_send_ack_report  = TRUE;

   // Set first zerovalue for calibrating sensor reading
   U8 i = 0;
   for(i = ADC_START_CHANNEL; i <= ADC_END_CHANNEL; i++) {
      if(i != 3) {
         Zerovalue[i] = adc_reader(i);
      }
   }
}


//! Task which links mouse events with the USB HID mouse device
//!
void mouse_task(void)
{
   if(Is_usb_vbus_low())
   {
      Setup_power_down_mode();
      Sleep_instruction();
   }

   if(!Is_device_enumerated())
      return;  // Device not ready

#if (USB_LOW_SPEED_DEVICE==DISABLE)
   // The SOF is used to schedule the task at the same frequency that Endpoint Interrupt frequency
   // This check allow to win a CPU time
   if(g_u8_cpt_sof<NB_IDLE_POLLING_SOF)
      return;  // Wait a delay
   g_u8_cpt_sof=0;
#endif

   if(!g_b_send_report)
   {
      // No report sending on going, then check mouse event to eventualy fill a new report
      if(is_mouse_event())
      {
         // Enable sending of report
         g_b_send_report      = TRUE;
      }
   }

   if((!g_b_send_report)&&(!g_b_send_ack_report))
      return;  // No report and ack to send

   //** A report or ack must be send
   Usb_select_endpoint(EP_MOUSE_IN);
   if(!Is_usb_write_enabled())
      return;  // Endpoint no free

   Led0_on();
   if( g_b_send_report )
   {
      g_b_send_report      = FALSE;
      // Send an ack after a "clic" report only
      g_b_send_ack_report = (0!=g_hid_mouse_report[0]);
   }
   else
   {
      Hid_mouse_report_reset();     // Reset report to have a ack report
      g_b_send_ack_report  = FALSE;
   }
   // Send report
   Usb_write_byte(g_hid_mouse_report[0]);
   Usb_write_byte(g_hid_mouse_report[1]);
   Usb_write_byte(g_hid_mouse_report[2]);
   Usb_write_byte(g_hid_mouse_report[3]);
   Usb_ack_in_ready();
   Led0_off();
}


//! This function increments the SOF counter each times
//!
//! @verbatim
//! the USB Start Of Frame interrupt subroutine is executed (1ms)
//! Usefull to manage time delays
//! @endverbatim
//!
void sof_action()
{
   g_u8_cpt_sof++;
}


//! This function enables switches interruptions and enters the CPU in power down mode.
//!
//! @verbatim
//! This function is executed when a suspend is received.
//! @endverbatim
//!
void suspend_action(void)
{
#if (USB_REMOTE_WAKEUP_FEATURE == ENABLED)
   if (remote_wakeup_feature == ENABLED)
   {
      Switches_enable_it();
   }
   Led1_off();
   Enable_interrupt();
   Enter_power_down_mode();
   Led1_on();
#endif
}


#if (USB_REMOTE_WAKEUP_FEATURE == ENABLED)
//! This function exits the CPU of the power down mode and disables switches interruptions
//!
//! @verbatim
//! This function is executed when a switche interruption is received
//! @endverbatim
//!
#ifdef __GNUC__
ISR(PCINT0_vect)
#else
#pragma vector = PCINT0_vect
__interrupt void switch_event_int()
#endif
{
   Switches_disable_it();
   usb_generate_remote_wakeup();
}
#endif

     
