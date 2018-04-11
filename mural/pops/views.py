from django.shortcuts import render
from django.views.generic import DetailView
from .models import Learnmore

# ---- OBJECT ---
class ObjectDetailView(DetailView):
    template_name = "pops/object_detail.html"
