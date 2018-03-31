Updates and intall
====================


Update yum
::
	yum update
	yum groupinstall "Development Tools"

update Python
::
	wget https://python.org/ftp/python/3.6.5/Python-3.6.5.tar.xz

didn't work, never mind -- stay with python 3.4 for now

clone git
First, establish msm_user login
Then
::
	
	git clone https://github.com/DigitalGizmo/msm_mural_project.git msm-mural.digitalgizmo.com

Set up virtual env
::
	mkvirtualenv -a  /var/www/msm_user/data/www/msm-mural.digitalgizmo.com/mural --python=/usr/local/bin/python3.4 mural

pip installs
::
	pip install django
	pip install psycopg2-binary
	pip install Unipath

set up apache with wsgi
in /etc/httpd/conf/vhosts
To apache add
::

	# Don inserting here
	Alias /static/ /var/www/msm_user/data/www/msm_mural_static/
	WSGIDaemonProcess staging python-path=/var/www/msm_user/data/www/msm-mural.digitalgizmo.com/mural:/var/www/msm_user/data/.envs/mural/lib/python3.4/site-packages
	WSGIProcessGroup staging
	WSGIScriptAlias / /var/www/msm_user/data/www/msm-mural.digitalgizmo.com/mural/config/wsgi.py
	# end insertion


	?
	<Directory /var/www/msm_user/data/www/msm-mural.digitalgizmo.com/mural/config>
	   <Files wsgi.py>
	      Order deny,allow
	     Allow from all
	  </Files>
	</Directory>

and then
::
	<Directory /var/www/msm_user/data/www/msm-mural.digitalgizmo.com>
        Options +Includes +ExecCGI
	</Directory>

