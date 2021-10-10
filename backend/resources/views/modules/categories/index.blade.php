@extends('layouts.app')

@section('title', 'Categories')

@section('content')
    <x-bread-crumb>
        <x-bread-crumb-link :link="route('dashboard')">
            Dashboard
        </x-bread-crumb-link>
        <x-bread-crumb-link>
            Categories
        </x-bread-crumb-link>
    </x-bread-crumb>
    <form action="{{route('categories.index')}}">
        <div class="row d-flex justify-content-between mb-2">
            <div class="col-6">
                <div class="input-group mb-3">
                    <input type="search" name="search" value="{{request()->get('search')}}" class="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-outline-primary" type="submit"><i class="fal fa-search"></i></button>
                        <a class="btn btn-outline-danger" href="{{route('categories.index')}}"><i class="fal fa-times"></i></a>
                    </div>
                </div>
            </div>
            <div class="col-2">
                <a class="btn btn-outline-success float-right" href="{{route('categories.create')}}">Create</a>
            </div>
            <div class="col-12">
                <table class="table table-responsive-sm table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Icon</th>
                        <th scope="col">Icon type</th>
                        <th scope="col">Active</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    @forelse($categories as $category)
                        <tr>
                            <th scope="row">{{$loop->iteration}}</th>
                            <td>{{$category->getAttribute('name')}}</td>
                            <td>{{$category->getAttribute('icon')}}</td>
                            <td>{{$category->getAttribute('icon_type')}}</td>
                            <td>
                                {!! $category->getAttribute('active') ?
                                    '<i class="fas fa-check-circle text-success" style="font-size:18px"></i>':
                                    '<i class="fas fa-times-circle text-danger"  style="font-size:18px"></i>'
                                !!}
                            </td>
                            <td>
                                <div class="btn-sm-group">
                                    <a href="{{route('categories.show', $category)}}" class="btn btn-sm btn-outline-primary">
                                        <i class="fal fa-eye"></i>
                                    </a>
                                    <a href="{{route('categories.edit', $category)}}" class="btn btn-sm btn-outline-success">
                                        <i class="fal fa-pen"></i>
                                    </a>
                                    <a href="{{route('categories.destroy', $category)}}" delete data-name="{{$category->getAttribute('name')}}" class="btn btn-sm btn-outline-danger" >
                                        <i class="fal fa-trash"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <th colspan="5">
                                <div class="row justify-content-center m-3">
                                    <div class="col-7 alert alert-danger text-center" role="alert">Empty for now</div>
                                </div>
                            </th>
                        </tr>
                    @endforelse
                    </tbody>
                </table>
            </div>
            <div class="col-6">
                <div class="float-right">
                    {{$categories->links()}}
                </div>
            </div>
        </div>
    </form>
@endsection
