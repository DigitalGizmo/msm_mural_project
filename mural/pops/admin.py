from django.contrib import admin
from .models import Learnmore

class LearnmoreAdmin(admin.ModelAdmin):
    change_form_template = 'panels/admin/panel_change_form.html'
    fieldsets = [
        (None,  {'fields': ['article', 'learnmore_type', 'title', 
            'slug', 'caption', 'narrative']}),
        # ('Dig Deeper',   {'fields': ['people', 'evidence', 'contexts',
        #     'featured_specials']}),
    ]
    # filter_horizontal = ['people', 'evidence', 'contexts', 'featured_specials']    
    #search_fields = ['title']
    list_display = ('title', 'slug', 'article', 'learnmore_type')
    list_filter     = ['article'] 
    # search_fields = ['title']

admin.site.register(Learnmore, LearnmoreAdmin)
