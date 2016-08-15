/*This file has been prepared for Doxygen automatic documentation generation.*/
//! \file *********************************************************************
//!
//! \brief This file contains all sensor code.
//!
//! \author Bastian S. Solem and Vegard Øye
//!
//! ***************************************************************************

//_____  I N C L U D E S ______________________________________________________

#include "sensors.h"

//_____ D E C L A R A T I O N S _______________________________________________

//! State variable, to memorize across tasks.
U8 State = DEFAULT_STATE;

//! Generic global counter to stay in a state a number of tasks.
//! Remember to reset before changing state!
U16 State_counter = 0;

//! If #TRUE, cursor speed may be decreased by skipping tasks.
bit Slow_cursor = FALSE;

//! If #TRUE, the left mouse button is held down.
bit Left_holddown = FALSE;

//! If #TRUE, there is a mouse event.
//! This is the value returned by #is_mouse_event.
bit Report_filled = FALSE;

//! Mouse report, defined in mouse_task.c.
extern U8 g_hid_mouse_report[4];

//! Calibration values of sensors (i.e., reference level).
U8 Zerovalue[8] = {0};

//! Read values of sensors, to be compared against the calibration values.
U8 Invalue[8] = {0};

//! Number of currently active sensor.
U8 Active_sensor = 0;

//! Number of active neighbor sensor.
U8 Neighbor_sensor = 0;

//! Matrix of adjacent sensors.
//! (PF0 and PF3 are temp. sensors and are disabled.)
//!
//                       PF: 0  1  2  3  4  5  6  7
bit Nearby_sensors[8][8] = {{0, 0, 0, 0, 0, 0, 0, 0},
                            {0, 0, 1, 0, 1, 0, 0, 0},
                            {0, 1, 0, 0, 0, 1, 0, 0},
                            {0, 0, 0, 0, 0, 0, 0, 0},
                            {0, 0, 1, 0, 0, 1, 0, 0},
                            {0, 0, 0, 0, 0, 0, 0, 0},
                            {0, 0, 0, 0, 0, 1, 0, 1},
                            {0, 0, 0, 0, 0, 1, 1, 0}};

//_____ D E F I N I T I O N S _________________________________________________

//! This function checks the board interface and fills the HID mouse report.
//!
//! Divided into \em states to remember things across tasks.
//! The current state is represented by the global variable #State,
//! and the actions to be carried out are placed in state functions.
//! Thus, this function calls one of #Default_func, #Mov_count_func,
//! #Mov_press_func, #Mov_touch_func, #Button_wait_func and #Scroll_func.
//! For a detailed description of each state, see their state function.
//!
//! It also calls #Maybe_slow_cursor and #Maybe_left_holddown to slow down
//! the cursor and/or hold the left mouse button down.
//!
//! @return TRUE if an event occurs. In this case, the report is filled.
//! @return FALSE if no event.
//!
bit is_mouse_event(void) {
   // Always reset the HID mouse report. Always.
   Hid_mouse_report_reset();

   Read_sensors();

   switch(State) {
      case DEFAULT_STATE :
         Report_filled = Default_func();
         break;

      case MOV_COUNT_STATE :
         Report_filled = Mov_count_func();
         break;

      case MOV_PRESS_STATE :
         Report_filled = Mov_press_func();
         break;

      case MOV_TOUCH_STATE :
         Report_filled = Mov_touch_func();
         break;

      case BUTTON_WAIT_STATE :
         Report_filled = Button_wait_func();
         break;

      case SCROLL_STATE :
         Report_filled = Scroll_func();
         break;

      default :
         State = DEFAULT_STATE;
         Report_filled = FALSE;
         break;
   }

   Report_filled = Maybe_slow_cursor();
   Report_filled = Maybe_left_holddown();

   return Report_filled;
}

//! This function defines state 0: Default State.
//!
//! Reads sensors and checks for trigger event.
//! If a movement sensor is active, enter Movement Countdown State;
//! if a button sensor is active, enter Button Wait State.
//! The mouse report is filled before entering these states,
//! and the active sensor is stored in #Active_sensor.
//!
//! If no sensors are active, re-calibrate now and then.
//!
//! This function uses #State_counter.
//!
//! This function sets #Slow_cursor.
//!
//! This function may change #Left_holddown.
//!
//! @return TRUE if a sensor is active and the report is filled.
//! @return FALSE otherwise.
//!
bit Default_func(void) {
   Active_sensor = NO_SENSOR;
   Neighbor_sensor = NO_SENSOR;

   // Check for trigger event
   Active_sensor = find_active_sensor();

   if(is_button_sensor(Active_sensor)) { // Buttons cheek
      if(Left_holddown) {
         Left_holddown = FALSE;
         Active_sensor = NO_SENSOR;
      }
      State_counter = 0;
      State = BUTTON_WAIT_STATE;
      return TRUE;
   }
   else if(is_movement_sensor(Active_sensor)) { // Movements cheek
      Modify_report(Active_sensor);
      State_counter = 0;
      Slow_cursor = TRUE;
      State = MOV_COUNT_STATE;
      return TRUE;
   }

   // No event, re-calibrate every 250 task
   if(State_counter > 250) {
      State_counter = 0;
      Calibrate();
   }
   State_counter++;

   return FALSE;
}

//! This function defines state 1: Movement Countdown State.
//!
//! Enter Movement Touch State on release or, if the user
//! is still pressing after 250 tasks, Movement Press State.
//! #Active_sensor holds the sensor to be checked.
//!
//! This function uses #State_counter.
//!
//! This function may change #Slow_cursor.
//!
//! @return TRUE while moving sensor.
//! @return FALSE otherwise.
//!
bit Mov_count_func(void) {
   State_counter++;

   if(!is_sensor_active(Active_sensor) && State_counter > 10) {
      State_counter = 0;
      State = MOV_TOUCH_STATE;
      return TRUE;
   }
   else if(State_counter > 250) {
      State_counter = 0;
      Slow_cursor = FALSE;
      State = MOV_PRESS_STATE;
      return TRUE;
   }

   Modify_report(Active_sensor);
   return TRUE;
}

//! This function defines state 2: Movement Press State.
//!
//! Reads active movement sensors, checks for hang, and
//! modifies the mouse report with pressure-dependent speeds.
//! When movement sensors are no longer active, enter Default State.
//!
//! @return TRUE if a movement sensor is active.
//! @return FALSE otherwise.
//!
bit Mov_press_func(void) {
   Active_sensor = find_active_sensor();

   if(is_movement_sensor(Active_sensor)) {
      Neighbor_sensor = check_nearby_sensor(Active_sensor);

      Check_hang(Active_sensor);

      Modify_report(Active_sensor);
      Modify_report(Neighbor_sensor);

      Inc_speed(Active_sensor);
      Inc_speed(Neighbor_sensor);

      return TRUE;
   }

   State = DEFAULT_STATE;
   return FALSE;
}

//! This function defines state 3: Movement Touch State.
//!
//! Like Movement Countdown State, move slowly in
//! the direction of #Active_sensor. After 1000 tasks,
//! move faster.
//!
//! Exiting the state happens in three ways:
//!
//! If the current sensor is touched again, stop the movement
//! and enter Button Wait State. If a button sensor is touched,
//! do the same.
//!
//! If another movement sensor is touched, enter Movement Countdown State.
//!
//! This function uses #State_counter.
//!
//! This function may change #Slow_cursor.
//!
//! This function may change #Left_holddown.
//!
//! @return TRUE while in this state.
//! @return FALSE when a button sensor is touched.
//!
bit Mov_touch_func(void) {
   if(Left_holddown) {
      Left_holddown = !is_button_sensor(find_active_sensor());
   }

   if(is_button_sensor(find_active_sensor()) ||
      Active_sensor == find_active_sensor()) {

      Active_sensor = NO_SENSOR;
      State_counter = 0;
      State = BUTTON_WAIT_STATE;
      return FALSE;
   }
   else if(is_movement_sensor(find_active_sensor())) {
      Active_sensor = find_active_sensor();
      State_counter = 0;
      State = MOV_COUNT_STATE;
      return TRUE;
   }

   if(State_counter <= 1000) {
      State_counter++;
   }
   else { // Past first 1000 tasks, move faster
      Slow_cursor = FALSE;
   }

   Modify_report(Active_sensor);
   return TRUE;
}

//! This function defines state 4: Button Wait State.
//!
//! Produce one click and wait. The precise behavior depends on
//! the value the previous task has set #Active_sensor to:
//!
//! If #Active_sensor is #NO_SENSOR, don't produce a click;
//! just enter Default State on release (but no earlier than
//! 100 tasks).
//!
//! If #Active_sensor is a button, produce a click on quick release
//! and enter Default State. However, if the button is held
//! for more than 100 tasks, enter a different state:
//!
//! If #Active_sensor is #LCLICK_SENSOR, activate holddown
//! of the left mouse button and enter Default State.
//!
//! If #Active_sensor is #RCLICK_SENSOR, enter Scroll State.
//!
//! This function uses #State_counter.
//!
//! This function may change #Left_holddown.
//!
//! @return TRUE when producing a click.
//! @return FALSE while waiting.
//!
bit Button_wait_func(void) {
   switch(Active_sensor) {
      case NO_SENSOR :
         State_counter++;

         if(State_counter > 100 &&
            !is_button_sensor(find_active_sensor())) {

            State_counter = 0;
            State = DEFAULT_STATE;
         }
         return FALSE;

      default : // Button
         if(!is_button_sensor(find_active_sensor())) {
            if(State_counter > 100) {
               Left_holddown = FALSE;

               if(Active_sensor == LCLICK_SENSOR) {
                  Left_holddown = TRUE;
               }
               else {
                  State = SCROLL_STATE;
                  return FALSE;
               }
            }
            Modify_report(Active_sensor);
            State_counter = 0;
            State = DEFAULT_STATE;
            return TRUE;
         }
         State_counter++;
         return FALSE;
   }
}

//! This function defines state 5: Scroll State.
//!
//! #UP_SENSOR scrolls up and #DOWN_SENSOR scrolls down.
//! Scroll signals are sent only every 50 task to limit speed.
//!
//! Exits to Button Wait State when a button is pressed.
//!
//! This function uses #State_counter.
//!
//! @return TRUE while scrolling.
//! @return FALSE otherwise.
//!
bit Scroll_func(void) {
   Active_sensor = find_active_sensor();
   State_counter++;

   if(State_counter > 50 || is_button_sensor(Active_sensor)) {
      State_counter = 0;

      switch(Active_sensor) {
         case UP_SENSOR : // PF1
            Hid_mouse_report_scroll_up();
            return TRUE;

         case DOWN_SENSOR : // PF5
            Hid_mouse_report_scroll_down();
            return TRUE;

         case RCLICK_SENSOR : // PF6
            Active_sensor = NO_SENSOR;
            State_counter = 0;
            State = BUTTON_WAIT_STATE;
            return TRUE;

         case LCLICK_SENSOR : // PF7
            Active_sensor = NO_SENSOR;
            State_counter = 0;
            State = BUTTON_WAIT_STATE;
            return FALSE;
      }
   }
   return FALSE;
}

//! This function slows the cursor down if #Slow_cursor is #TRUE.
//!
//! If so, and if #State_counter is not a multiple of 5,
//! reset byte 1 and 2 in #g_hid_mouse_report.
//!
//! This function uses #State_counter.
//!
//! @return FALSE if movement has been decimated.
//! @return TRUE otherwise.
//!
bit Maybe_slow_cursor(void) {
   if(Slow_cursor && State_counter % 5 != 0) {
      g_hid_mouse_report[1] = 0;
      g_hid_mouse_report[2] = 0;
      return FALSE;
   }
   return TRUE;
}

//! This function holds down the left button if #Left_holddown is #TRUE.
//!
//! @return TRUE if the button is held down.
//! @return #Report_filled otherwise.
//!
bit Maybe_left_holddown(void) {
   if(Left_holddown) {
      Modify_report(LCLICK_SENSOR);
   }
   return (Report_filled || Left_holddown);
}

//! This function checks whether a sensor is a movement sensor.
//!
//! That is, if it is one of #DOWN_SENSOR, #LEFT_SENSOR,
//! #RIGHT_SENSOR or #UP_SENSOR.
//!
//! @param sensor The sensor to be checked.
//!
//! @return TRUE if a movement sensor.
//! @return FALSE otherwise.
//!
bit is_movement_sensor(U8 sensor) {
   if(sensor == DOWN_SENSOR) {
      return TRUE;
   }
   else if(sensor == LEFT_SENSOR) {
      return TRUE;
   }
   else if(sensor == RIGHT_SENSOR) {
      return TRUE;
   }
   else if(sensor == UP_SENSOR) {
      return TRUE;
   }
   return FALSE;
}

//! This function checks whether a sensor is a button sensor.
//!
//! That is, if it is one of #LCLICK_SENSOR or #RCLICK_SENSOR.
//!
//! @param sensor The sensor to be checked.
//!
//! @return TRUE if a button sensor.
//! @return FALSE otherwise.
//!
bit is_button_sensor(U8 sensor) {
   if(sensor == LCLICK_SENSOR) {
      return TRUE;
   }
   else if(sensor == RCLICK_SENSOR) {
      return TRUE;
   }
   return FALSE;
}

//! This function reads the chosen ADC channel.
//!
//! \todo Can be rewritten with an init.
//! The wait must then also be rewritten to wait for ADSC clear.
//!
//! @param channel The channel to be read.
//!
//! @return The value of the channel.
//!
U8 adc_reader(U8 channel) {
   Clear_adc_flag();
   Enable_adc();
   Set_prescaler(6);
   Start_conv_channel(channel); // Normal conv. uses 13 clock cycles
   while(!Is_adc_conv_finished()); // Wait for ADC conv.
   return Adc_get_8_bits_result();
}

//! This function updates #Invalue.
//!
void Read_sensors(void) {
   U8 sensor;
   for(sensor = ADC_START_CHANNEL; sensor <= ADC_END_CHANNEL; sensor++) {
      if(is_movement_sensor(sensor) || is_button_sensor(sensor)) {
         Invalue[sensor] = adc_reader(sensor);
      }
   }
}

//! This function updates #Zerovalue by copying #Invalue.
//!
//! Remember to call #Read_sensors to get fresh results.
//!
void Calibrate(void) {
   U8 sensor;
   for(sensor = ADC_START_CHANNEL; sensor <= ADC_END_CHANNEL; sensor++) {
      Zerovalue[sensor] = Invalue[sensor];
   }
}

//! This function checks whether a sensor's value is
//! larger than a given step threshold, relative to #Zerovalue.
//!
//!     Invalue[sensor] > (Zerovalue[sensor] + step)
//!
//! @param sensor The sensor to be measured.
//! @param step The step: #STEP, #STEP2, ..., #STEP6.
//!
//! @return TRUE if the value is larger.
//! @return FALSE if not.
//!
bit is_sensor_step(U8 sensor, U8 step) {
   return (Invalue[sensor] > (Zerovalue[sensor] + step));
}

//! This function checks whether a sensor if active.
//! Uses #STEP for movement sensors and #STEP2 for button sensors.
//!
//! Remember to call #Read_sensors to get fresh results.
//!
//! @param sensor The sensor to be checked.
//!
//! @return TRUE if active.
//! @return FALSE if not active.
//!
bit is_sensor_active(U8 sensor) {
   if(is_button_sensor(sensor)) { // Buttons cheek
      return is_sensor_step(sensor, STEP2);
   }
   else if(is_movement_sensor(sensor)) { // Movements cheek
      return is_sensor_step(sensor, STEP);
   }
   return FALSE;
}

//! This function checks which sensor is more active.
//!
//! Remember to call #Read_sensors to get fresh results.
//!
//! @param upper The sensor to be compared.
//! @param lower The sensor to compare against.
//!
//! @return TRUE if #upper is more active.
//! @return FALSE otherwise.
//!
bit is_more_active(U8 upper, U8 lower) {
   return ((Invalue[upper] > Invalue[lower] &&
            is_sensor_active(upper)));
}

//! This function runs through the read sensor values
//! and returns the most active sensor, if any.
//!
//! Remember to call #Read_sensors to get fresh results.
//!
//! @return The number of the active sensor, #NO_SENSOR if not found.
//!
U8 find_active_sensor(void) {
   U8 sensor = NO_SENSOR;
   U8 i;
   for(i = ADC_START_CHANNEL; i <= ADC_END_CHANNEL; i++) {
      if(is_more_active(i, sensor)) {
         sensor = i;
      }
   }
   return sensor;
}

//! This function returns an active nearby sensor, if any.
//!
//! Remember to call #Read_sensors to get fresh results.
//!
//! @param sensor The sensor whose nearby sensors are to be checked.
//!
//! @return The most active nearby sensor found.
//! @return #NO_SENSOR if no nearby sensors are active.
//!
U8 check_nearby_sensor(U8 sensor) {
   U8 neighbor = NO_SENSOR;
   U8 i;
   for(i = sensor + 1; i <= ADC_END_CHANNEL; i++) {
      if(Nearby_sensors[sensor][i] && is_more_active(i, neighbor)) {
         neighbor = i;
      }
   }
   return neighbor;
}

//! This function re-calibrates a hanging sensor by checking opposite cheek.
//!
//! Doesn't do anything if passed #NO_SENSOR.
//!
//! Remember to call #Read_sensors to get fresh results.
//!
//! @param sensor The sensor to be checked.
//!
void Check_hang(U8 sensor) {
   U8 i;
   for(i = ADC_START_CHANNEL; i <= ADC_END_CHANNEL; i++) {
      if(is_sensor_active(i) &&
         ((is_movement_sensor(sensor) && is_button_sensor(i)) ||
          (is_button_sensor(sensor) && is_movement_sensor(i)))) {

         Calibrate();
         return;
      }
   }
}

//! This function checks sensor pressure for speed increase.
//! If pressure > #STEP3, ..., #STEP6 (relative to #Zerovalue),
//! call Modify_report() to increase cursor speed.
//!
//! Remember to call #Read_sensors to get fresh results.
//!
//! @param sensor The sensor to be measured.
//!
void Inc_speed(U8 sensor) {
   if(is_sensor_step(sensor, STEP3)) {
      Modify_report(sensor);
   }
   if(is_sensor_step(sensor, STEP4)) {
      Modify_report(sensor);
   }
   if(is_sensor_step(sensor, STEP5)) {
      Modify_report(sensor);
   }
   if(is_sensor_step(sensor, STEP6)) {
      Modify_report(sensor);
   }
}

//! This function modifies #g_hid_mouse_report.
//!
//! @param sensor The sensor whose corresponding action is to happen.
//! If #NO_SENSOR, no action is taken.
//!
void Modify_report(U8 sensor) {
   switch(sensor) {
      case NO_SENSOR : // No action
         break;

      case UP_SENSOR : // PF1
         Hid_mouse_report_up();
         break;

      case LEFT_SENSOR : // PF2
         Hid_mouse_report_left();
         break;

      case RIGHT_SENSOR : // PF4
         Hid_mouse_report_right();
         break;

      case DOWN_SENSOR : // PF5
         Hid_mouse_report_down();
         break;

      case RCLICK_SENSOR : // PF6
         Hid_mouse_report_click_right();
         break;

      case LCLICK_SENSOR : // PF7
         Hid_mouse_report_click_left();
         break;
   }
}

