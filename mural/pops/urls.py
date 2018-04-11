from django.urls import path

from . import views

app_name="pops"

urlpatterns = [
    path('ajax/object/<slug:slug>/', views.ObjectDetailView.as_view(), name='ajax_object_detail'),
    # path('<slug:slug>/', views.PanelDetailView.as_view(), name='panel_detail'),
]
