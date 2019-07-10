Maintenance
=============

Don't forget ..data/collect.sh and touch!!

Database
---------

msm_mural_db is on gizmo -- have db server connetion in PGAdmin 3

local path for server db backup using PGAdmin 4
:: 
	/Users/don/Documents/Projects/MaineStateMuseum/Mural/DataBaks/msm_mural_db_2019-01-11.backup

Export tables from pgadmin
In export dialog, say yes to headers
::
	Users/don/Documents/Projects/MaineStateMuseum/Mural/DataBaks/learnmores_2019-01-11.csv

After export - to plain text

Restart
::
	touch /var/www/msm_user/data/www/msm-mural.digitalgizmo.com/mural/config/wsgi.py
