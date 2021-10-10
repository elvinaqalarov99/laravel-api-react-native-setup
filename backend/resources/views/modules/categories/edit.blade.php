@extends('layouts.app')

@section('title', 'Categories')

@section('content')
    <x-bread-crumb>
        <x-bread-crumb-link :link="route('dashboard')">
            Dashboard
        </x-bread-crumb-link>
        <x-bread-crumb-link :link="route('categories.index')">
            Categories
        </x-bread-crumb-link>
        <x-bread-crumb-link>
            @if (!is_null($data))
                {{optional($data)->getAttribute('name')}}
            @else
                Create
            @endif
        </x-bread-crumb-link>
    </x-bread-crumb>
    <form action="{{$action}}" method="POST" enctype="multipart/form-data">
        @method($method) @csrf
        <input type="hidden" name="id" value="{{optional($data)->getAttribute('id')}}">
        <div class="tab-content row mt-4" >
            <div class="form-group col-12">
                <div class="row">
                    <x-input::text  name="name"  :value="optional($data)->getAttribute('name')"  label="Category name"  width="6" class="pr-3" />
                    <x-input::text  name="icon"  :value="optional($data)->getAttribute('icon')"  label="Category icon"  width="6" class="pr-3" />
                    <x-input::text  name="icon_type"  :value="optional($data)->getAttribute('icon_type')"  label="Category icon type"  width="6" class="pr-3" />
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" @if(optional($data)->getAttribute('active') === true) checked @endif name="active" id="data-active">
                    <label class="form-check-label" for="data-active">
                        Is Active
                    </label>
                </div>
            </div>
        </div>
        @if($action)
            <x-input::submit  value="Save" />
        @endif
    </form>
@endsection
@section('scripts')
    @if(is_null($action))
        <script>
            $('input').attr('readonly', true)
        </script>
    @endif
@endsection
