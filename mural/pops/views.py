from django.shortcuts import render, get_object_or_404
from django.views.generic import DetailView
from .models import Learnmore, Slide, Hotspot, Visit

# ---- SINGLES ---
class TodayDetailView(DetailView):
    model = Learnmore
    template_name = "pops/today_detail.html"

class VideoDetailView(DetailView):
    model = Learnmore
    template_name = "pops/video_detail.html"

class VoicesDetailView(DetailView):
    model = Learnmore
    template_name = "pops/voices_detail.html"

class CreditsDetailView(DetailView):
    model = Learnmore
    template_name = "pops/credits_detail.html"

class VisitDetailView(DetailView):
    model = Visit
    template_name = "pops/visit_detail.html"

class HotspotDetailView(DetailView):
    model = Hotspot
    template_name = "pops/hotspot_detail.html"

# ---- SLIDE-BASED ---

class SlideDetailView(DetailView):
    """
    To be sub-classed by Images and Objects
    """
    model = Learnmore
    template_name = "pops/images_detail.html"
    # template_name = determined by sub class
    # extend_base - default from MobileFullMixin, or override in sub class
    # link_name and link_class established in  FeatureDetailView  - MobileFullMixin,
    
    # 
    def get_context_data(self, **kwargs):
        context = super(SlideDetailView, self).get_context_data(**kwargs)
        # get the learnmore object
        learnmore_object = super(SlideDetailView, self).get_object()

        # return an error message if no slides have been entered in admin
        if learnmore_object.slide_set.all():
            # use slide_num from param, if it's there
            if 'slide_num' in self.kwargs:
                slide_num_arg = self.kwargs['slide_num']
                # print(" --- slide num in kwargs: " + str(slide_num_arg))
            else: # otherwise, this is zero - the intro
                slide_num_arg = 1
                # print(" --- slide num zeero: " + str(slide_num_arg))

            # get the slide object
            slide = get_object_or_404(Slide, learnmore_id=learnmore_object.id, 
                slide_num=slide_num_arg)
            error_msg = None
        else:
            slide = None
            error_msg = "Error: For learnmore at least one slide has to be " + \
                "defined in Admin."


        # add variables to context
        context.update({'slide': slide, 'error_msg': error_msg})
        # , 'link_name': self.link_name, 'link_class': self.link_class
        return context


class ObjectsDetailView(SlideDetailView):
    model = Learnmore
    template_name = "pops/objects_detail.html"

class ImagesDetailView(SlideDetailView):
    model = Learnmore
    template_name = "pops/images_detail.html"

