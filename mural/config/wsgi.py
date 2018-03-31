"""
WSGI config for mural project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/howto/deployment/wsgi/
"""

import os

try:
	import mod_wsgi
	try:
		os.environ['DJANGO_SETTINGS_MODULE'] = 'config.settings.%s' % mod_wsgi.process_group
	except AttributeError:
		# let the above setting stand
		os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.local")
except ImportError:
	os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.local")
	
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

