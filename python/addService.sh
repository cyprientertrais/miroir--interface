#!/bin/bash

echo "[Unit]
Description=Allumage/extinction ecran
After=network-online.target

[Service]
Type=simple
User=root
Restart=on-failure
RestartSec=1
ExecStart=/bin/python3 /usr/pi///InterruptMiroir.py

[Install]
WantedBy=multi-user.target" >> /etc/systemd/system/InterruptMiroir.service

sudo systemctl enable InterruptMiroir.service
sudo systemctl deamon-reload
sudo systemctl start InterruptMiroir.service
