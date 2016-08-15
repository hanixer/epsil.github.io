
# Project name
PROJECT = series6-hidmouse

# CPU architecture : {avr0|...|avr6}
# Parts : {at90usb646|at90usb647|at90usb1286|at90usb1287|at90usb162|at90usb82}
MCU = at90usb1287

# Source files
CSRCS = \
  ../../../../common/lib_mcu/wdt/wdt_drv.c\
  ../../../../common/lib_mcu/adc/adc_drv.c\
  ../../../../common/modules/scheduler/scheduler.c\
  ../../../lib_mcu/power/power_drv.c\
  ../../../lib_mcu/usb/usb_drv.c\
  ../../../modules/usb/device_chap9/usb_device_task.c\
  ../../../modules/usb/device_chap9/usb_standard_request.c\
  ../../../modules/usb/usb_task.c\
  ../usb_specific_request.c\
  ../usb_descriptors.c\
  ../sensors.c\
  ../mouse_task.c\
  ../main.c\

# Assembler source files
ASSRCS = \

