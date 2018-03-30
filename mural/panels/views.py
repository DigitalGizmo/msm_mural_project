from django.shortcuts import get_object_or_404
from django.views.generic import DetailView
from .models import Panel, Article

class PanelDetailView(DetailView):
    """
    Two parameters are sent: slug and article_type
    Slug finds the panel. From there we just have to find the right article
    (We're not going directly by article pk, and articles don't have slugs)
    """
    model = Panel
    # context_object_name = 'object'
    template_name = 'panels/panel_detail.html'

    # get the initial, intro, article    
    def get_context_data(self, **kwargs):
        # get context
        context = super(PanelDetailView, self).get_context_data(**kwargs)
        # get panel object from detail view
        panel_object = super(PanelDetailView, self).get_object()

        # # for later article_num will come from parameters
        # if kwargs['article_type']:

        #     article_type_arg = self.kwargs['article_type']
        
        article_type_arg = self.kwargs['article_type']


        # else:
        #     article_type_arg = 1

        # if kwargs is not None:
        #     for key, value in kwargs.iteritems():
        #         print ("%s == %s" %(key,value))

        # common_keys = list(dict_a.viewkeys() & dict_b.viewkeys())

        # article_type_arg = 1

        # get the article object
        article = get_object_or_404(Article, panel_id=panel_object.id, 
            article_type=article_type_arg)
        # set the chapter object in the context
        context['article'] = article
        # We need next and previous panel numbers for navigation
        # get_next, get_prev set by properties in Chapter model

        return context


