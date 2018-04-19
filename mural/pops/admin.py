from django.contrib import admin
from .models import Learnmore, Slide, Voice

class LearnmoreAdmin(admin.ModelAdmin):
    change_form_template = 'panels/admin/panel_change_form.html'
    fieldsets = [
        (None,  {'fields': ['article', 'learnmore_type', 'title']}),
        ('Singles: Today, Video, Vist',   {'fields': ['caption', 'narrative'], 
            'classes': ['collapse']}),
        ('Mulitples: see Slides and Videos',   {'fields': []}),
    ]
    # filter_horizontal = ['people', 'evidence', 'contexts', 'featured_specials']    
    #search_fields = ['title']
    list_display = ('title', 'article', 'learnmore_type')
    list_filter     = ['article'] 
    # search_fields = ['title']

admin.site.register(Learnmore, LearnmoreAdmin)


class SlideAdmin(admin.ModelAdmin):
    change_form_template = 'panels/admin/panel_change_form.html'
    fieldsets = [
        (None,  {'fields': ['learnmore', 'slide_num', 'title',
            'caption', 'narrative']}),
        # ('Dig Deeper',   {'fields': ['people', 'evidence', 'contexts',
        #     'featured_specials']}),
    ]
    # filter_horizontal = ['people', 'evidence', 'contexts', 'featured_specials']    
    #search_fields = ['title']
    list_display = ('learnmore', 'slide_num')
    list_filter     = ['learnmore'] 
    # search_fields = ['title']

admin.site.register(Slide, SlideAdmin)


class VoiceAdmin(admin.ModelAdmin):
    change_form_template = 'panels/admin/panel_change_form.html'
    fieldsets = [
        (None,  {'fields': ['learnmore', 'part_num', 'title',
            'narrative']}),
        # ('Dig Deeper',   {'fields': ['people', 'evidence', 'contexts',
        #     'featured_specials']}),
    ]
    list_display = ('learnmore', 'part_num', 'title')
    list_filter     = ['learnmore'] 
    # search_fields = ['title']

admin.site.register(Voice, VoiceAdmin)

