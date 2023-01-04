import django_filters
from django.contrib.contenttypes.models import ContentType
from django.db.models import Q

from dcim.models import Device
from netbox.filtersets import NetBoxModelFilterSet
from utilities.filters import MultiValueCharFilter, MultiValueNumberFilter, ContentTypeFilter
from virtualization.models import VirtualMachine
from .models import Secret, SecretRole

__all__ = (
    'SecretFilterSet',
    'SecretRoleFilterSet',
)


class SecretRoleFilterSet(NetBoxModelFilterSet):
    q = django_filters.CharFilter(
        method='search',
        label='Search',
    )
    name = django_filters.ModelMultipleChoiceFilter(
        queryset=SecretRole.objects.all(),
        field_name='name'
    )

    class Meta:
        model = SecretRole
        fields = ['id', 'name', 'slug']

    def search(self, queryset, name, value):
        if not value.strip():
            return queryset
        return queryset.filter(
            Q(name__icontains=value) |
            Q(slug__icontains=value)
        )


class SecretFilterSet(NetBoxModelFilterSet):
    q = django_filters.CharFilter(
        method='search',
        label='Search',
    )
    name = django_filters.ModelMultipleChoiceFilter(
        queryset=SecretRole.objects.all(),
        field_name='name'
    )
    role_id = django_filters.ModelMultipleChoiceFilter(
        queryset=SecretRole.objects.all(),
        label='Role (ID)',
    )
    role = django_filters.ModelMultipleChoiceFilter(
        field_name='role__slug',
        queryset=SecretRole.objects.all(),
        to_field_name='slug',
        label='Role (slug)',
    )

    class Meta:
        model = Secret
        fields = ['id', 'assigned_object_type_id', 'assigned_object_id', 'name', 'role_id', 'role', ]

    def search(self, queryset, name, value):
        if not value.strip():
            return queryset
        return queryset.filter(
            Q(name__icontains=value)
        )
