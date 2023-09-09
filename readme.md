# Z-Way module for automation of smart plug

This module periodically requests configured address in the network and checks for the presence of some data in the
response (using XPath). And with a positive result, it turns on the selected smart home element or turns it off if the
answer is negative.

I wrote this module to control the power of the subwoofer depending on whether the audio-receiver is turned on.

Default Location: /opt/z-way-server/automation/userModules/WallPlugSmartControl

Server restart: /etc/init.d/z-way-server restart

To use Wget, "wget" command need to be permitted by putting one line with the starting commands in the file *automation/.syscommands*

Some receiver models provide access to their REST API via the HTTPS protocol, but work with security certificates is not fully implemented. 
And standard JavaScript requests will not work. Therefore, you will have to switch to WGet, which can ignore problems with security certificates.
