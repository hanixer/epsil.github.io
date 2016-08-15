/*This file has been prepared for Doxygen automatic documentation generation.*/
//! \file *********************************************************************
//!
//! \brief  This file contains macros needed by sensors.c, as well as
//!         prototypes for all its functions.
//!
//! \author Vegard Øye
//!
//! ***************************************************************************

//_____  I N C L U D E S ______________________________________________________

#include "config.h"
#include "lib_mcu/adc/adc_drv.h"

//_____ M A C R O S ___________________________________________________________

// Originally defined in mouse_task.c.
// MOUSE_SPEED is defined in config.h.
#define Hid_mouse_report_up()            (g_hid_mouse_report[2] -= MOUSE_SPEED)
#define Hid_mouse_report_down()          (g_hid_mouse_report[2] += MOUSE_SPEED)
#define Hid_mouse_report_left()          (g_hid_mouse_report[1] -= MOUSE_SPEED)
#define Hid_mouse_report_right()         (g_hid_mouse_report[1] += MOUSE_SPEED)

#define Hid_mouse_report_scroll_up()     (g_hid_mouse_report[3] += MOUSE_SPEED)
#define Hid_mouse_report_scroll_down()   (g_hid_mouse_report[3] -= MOUSE_SPEED)

#define Hid_mouse_report_click_left()    (g_hid_mouse_report[0] |= 0x01)
#define Hid_mouse_report_click_right()   (g_hid_mouse_report[0] |= 0x02)
#define Hid_mouse_report_click_middle()  (g_hid_mouse_report[0] |= 0x04)

#define Hid_mouse_report_reset()         (g_hid_mouse_report[0] = 0, \
                                          g_hid_mouse_report[1] = 0, \
                                          g_hid_mouse_report[2] = 0, \
                                          g_hid_mouse_report[3] = 0)
// List of sensors.
#define NO_SENSOR         0
#define UP_SENSOR         1
#define LEFT_SENSOR       2
#define TEMP_SENSOR       3
#define RIGHT_SENSOR      4
#define DOWN_SENSOR       5
#define RCLICK_SENSOR     6
#define LCLICK_SENSOR     7

// List of states.
#define DEFAULT_STATE     0
#define MOV_COUNT_STATE   1
#define MOV_PRESS_STATE   2
#define MOV_TOUCH_STATE   3
#define BUTTON_WAIT_STATE 4
#define SCROLL_STATE      5

// DEBUG is defined in config.h.
// Do check since channels 4-7 are, quite inconveniently, used by JTAG.
#if (DEBUG == 1)
    #define    ADC_START_CHANNEL  1
    #define    ADC_END_CHANNEL    3
#else
    #define    ADC_START_CHANNEL  1
    #define    ADC_END_CHANNEL    7
#endif

// Step values, derived through experimentation.
#define STEP   ((U8)0x04)
#define STEP2  ((U8)0x15)
#define STEP3  ((U8)0x50)
#define STEP4  ((U8)0x80)
#define STEP5  ((U8)0xB0)
#define STEP6  ((U8)0xFF)

//_____ D E C L A R A T I O N S ____________________________________________

bit  is_mouse_event      (void);
bit  Default_func        (void);
bit  Mov_count_func      (void);
bit  Mov_press_func      (void);
bit  Mov_touch_func      (void);
bit  Button_wait_func    (void);
bit  Scroll_func         (void);
bit  Maybe_slow_cursor   (void);
bit  Maybe_left_holddown (void);
bit  is_movement_sensor  (U8 sensor);
bit  is_button_sensor    (U8 sensor);
U8   adc_reader          (U8 channel);
void Read_sensors        (void);
void Calibrate           (void);
bit  is_sensor_step      (U8 sensor, U8 step);
bit  is_sensor_active    (U8 sensor);
bit  is_more_active      (U8 upper, U8 lower);
U8   find_active_sensor  (void);
U8   check_nearby_sensor (U8 sensor);
void Check_hang          (U8 sensor);
void Inc_speed           (U8 sensor);
void Modify_report       (U8 sensor);
