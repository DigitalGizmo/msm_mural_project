from django.contrib import admin
from .models import Panel, Article

class PanelAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,            {'fields': ['panel_title', 'slug', 'ordinal',
        	'foreground_title']}),
        # ('Behind the scenes',   {'fields': ['status_num', 'ordinal', 'edited_by', 
        #     'edit_date', 'notes']}), # , 'classes': ['collapse']
    ]
    list_display = ('panel_title',  'slug', 'ordinal')
    # search_fields = ['title', 'slug']

admin.site.register(Panel, PanelAdmin)

class ArticleAdmin(admin.ModelAdmin):
    change_form_template = 'panels/admin/panel_change_form.html'
    fieldsets = [
        (None,  {'fields': ['panel', 'article_type', 'title', 
            'caption', 'narrative']}),
        # ('Dig Deeper',   {'fields': ['people', 'evidence', 'contexts',
        #     'featured_specials']}),
    ]
    # filter_horizontal = ['people', 'evidence', 'contexts', 'featured_specials']    
    list_display = ('title', 'panel', 'article_type')
    list_filter     = ['panel'] # , 'edit_date'
    # search_fields = ['title']

admin.site.register(Article, ArticleAdmin)
