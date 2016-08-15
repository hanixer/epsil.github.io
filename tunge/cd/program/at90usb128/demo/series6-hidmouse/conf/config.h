/*This file has been prepared for Doxygen automatic documentation generation.*/
//! \file *********************************************************************
//!
//! \brief This file contains the system configuration definition.
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
 * 2. Redistributi ons in binary form must reproduce the above copyright notice,
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

#ifndef _CONFIG_H_
#define _CONFIG_H_

// Compiler switch (do not change these settings)
#include "lib_mcu/compiler.h"             // Compiler definitions
#ifdef __GNUC__
   #include <avr/io.h>                    // Use AVR-GCC library
#elif __ICCAVR__
   #define ENABLE_BIT_DEFINITIONS
   #include <ioavr.h>                     // Use IAR-AVR library
#else
   #error Current COMPILER not supported
#endif


//! @defgroup global_config Application configuration
//! @{

#include "conf/conf_scheduler.h" //!< Scheduler tasks declaration

//! To include proper target hardware definitions, select
//! target board (USBKEY, STK525, STK600)
#define TARGET_BOARD USBKEY

//! CPU core frequency in kHz
#define FOSC 8000

   //! \name ADC Configuration
   //! This is used as input for tounge sensors
   //! @{
#define  USE_ADC                     //!< Enable or not the ADC usage
#define  ADC_PRESCALER              64 //!< ADC Prescaler value
#define  ADC_RIGHT_ADJUST_RESULT    0  //!< Left adjust
#define  ADC_INTERNAL_VREF          1  //!< Use ADC internal Vref
#define  ADC_IT                  	0  //!< Disable ADC interrupt
#define  ADC_DIGITAL_OFF         	1  //!< Turns off digital use of Port F (ADCs)
   //! @}


   //! \name Mouse Configuration
   //! Defines used in mouse_task.c
   //! @{
#define NB_IDLE_POLLING_SOF         3      //!< 10ms before looking for new mouse hardware event
#define MOUSE_SPEED                 1
#define DEBUG                       0       //!< Set debug or normal mode
   //! @}


//! @}


// Board defines (do not change these settings)
#define  STK525   1
#define  USBKEY   2
#define  STK600   3
#if (TARGET_BOARD==USBKEY)
   #include "lib_board\usb_key\usb_key.h"
#elif (TARGET_BOARD==STK525)
   #include "lib_board\stk_525\stk_525.h"
#elif (TARGET_BOARD==STK600)
   #include "lib_board\stk_600\stk_600.h"
#else
   #error TARGET_BOARD must be defined somewhere
#endif


#endif // _CONFIG_H_

