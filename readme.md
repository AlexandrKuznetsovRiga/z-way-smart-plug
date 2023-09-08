# Z-Way module for automation of smart plug

This module periodically requests configured address in the network and checks for the presence of some data in the
response (using XPath). And with a positive result, it turns on the selected smart home element or turns it off if the
answer is negative.

I wrote this module to control the power of the subwoofer depending on whether the audio-receiver is turned on.

Default Location: /opt/z-way-server/automation/userModules/WallPlugSmartControl

Server restart: /etc/init.d/z-way-server restart

To use Wget, "wget" command need to be permitted by putting one line with the starting commands in the file *automation/.syscommands*
