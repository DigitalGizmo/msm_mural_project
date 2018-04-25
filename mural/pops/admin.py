from django.contrib import admin
from .models import Learnmore, Slide, Voice, Visit, Hotspot

class SingleLearnmoreAdmin(admin.ModelAdmin):
    change_form_template = 'panels/admin/panel_change_form.html'
    fieldsets = [
        (None,  {'fields': ['article', 'title', 'alt_tag', 
            'caption', 'narrative']}),  
        # learnmore_type is set as the default, above, but should be hidden
        ('Behind the scenes',   {'fields': ['learnmore_type'], 
            'classes': ['collapse']}),
    ]
    list_display = ('title', 'article', 'learnmore_type')
    list_filter     = ['article'] 

class SlideInline(admin.TabularInline):
    model = Slide
    extra = 2

class SlideLearnmoreAdmin(admin.ModelAdmin):
    change_form_template = 'panels/admin/panel_change_form.html'
    fieldsets = [
        (None,  {'fields': ['article', 'title']}),  
        # learnmore_type is set as the default, above, but should be hidden
        ('Behind the scenes',   {'fields': ['learnmore_type'], 
            'classes': ['collapse']}),
    ]
    inlines = [SlideInline]
    list_display = ('title', 'article', 'learnmore_type')
    list_filter     = ['article'] 

# Create proxy classes so each type can have its own admin
# Singles
class Today(Learnmore):
    class Meta:
        proxy = True

class Video(Learnmore):
    class Meta:
        proxy = True

# with slides - multiples
class Image(Learnmore):
    class Meta:
        proxy = True

class Object(Learnmore):
    class Meta:
        proxy = True

class Voices(Learnmore):
    class Meta:
        proxy = True

# Singles
class TodayAdmin(SingleLearnmoreAdmin):
    # Filter to show just the desired learnmore-type
    def get_queryset(self, request):
        return self.model.objects.filter(learnmore_type = 'today')
    # Auto set learnmore type for new
    def get_changeform_initial_data(self, request):
        return {'learnmore_type': 'today'}

class VideoAdmin(SingleLearnmoreAdmin):
    def get_queryset(self, request):
        return self.model.objects.filter(learnmore_type = 'video')
    def get_changeform_initial_data(self, request):
        return {'learnmore_type': 'video'}


# Multiples
class ImageAdmin(SlideLearnmoreAdmin):
    def get_queryset(self, request):
        return self.model.objects.filter(learnmore_type = 'images')
    def get_changeform_initial_data(self, request):
        return {'learnmore_type': 'images'}

class ObjectAdmin(SlideLearnmoreAdmin):
    def get_queryset(self, request):
        return self.model.objects.filter(learnmore_type = 'objects')
    def get_changeform_initial_data(self, request):
        return {'learnmore_type': 'objects'}


# only case, so not subclassed
class VoiceInline(admin.TabularInline):
    model = Voice
    extra = 2

class VoicesAdmin(admin.ModelAdmin):
    change_form_template = 'pops/admin/voices_change_form.html'
    def get_queryset(self, request):
        return self.model.objects.filter(learnmore_type = 'voices')
    def get_changeform_initial_data(self, request):
        return {'learnmore_type': 'voices'}
    fieldsets = [
        (None,  {'fields': ['article', 'title', 'narrative']}),  
        ('Behind the scenes',   {'fields': ['learnmore_type'], 
            'classes': ['collapse']}),
    ]
    inlines = [VoiceInline]
    list_display = ('title', 'article', 'learnmore_type')
    list_filter     = ['article'] 

class VisitAdmin(admin.ModelAdmin):
    change_form_template = 'panels/admin/panel_change_form.html'
    fieldsets = [
        (None,  {'fields': ['panel', 'title', 'alt_tag', 
            'caption', 'narrative']}),  
    ]
    list_display = ('title', 'panel')


class HotspotAdmin(admin.ModelAdmin):
    change_form_template = 'panels/admin/panel_change_form.html'
    fieldsets = [
        (None,  {'fields': ['panel', 'title', 'slug', 'alt_tag', 
            ('x_position', 'y_position'), 'caption', 'narrative']}),  
    ]
    list_display = ('title', 'slug', 'panel', 'x_position', 'y_position')
    list_filter     = ['panel'] 


admin.site.register(Today, TodayAdmin)
admin.site.register(Video, VideoAdmin)
admin.site.register(Visit, VisitAdmin)
admin.site.register(Image, ImageAdmin)
admin.site.register(Object, ObjectAdmin)
admin.site.register(Voices, VoicesAdmin)
admin.site.register(Hotspot, HotspotAdmin)


# class VoiceAdmin(admin.ModelAdmin):
#     change_form_template = 'panels/admin/panel_change_form.html'
#     fieldsets = [
#         (None,  {'fields': ['learnmore', 'part_num', 'title',
#             'narrative']}),
#         # ('Dig Deeper',   {'fields': ['people', 'evidence', 'contexts',
#         #     'featured_specials']}),
#     ]
#     list_display = ('learnmore', 'part_num', 'title')
#     list_filter     = ['learnmore'] 
#     # search_fields = ['title']

# admin.site.register(Voice, VoiceAdmin)

