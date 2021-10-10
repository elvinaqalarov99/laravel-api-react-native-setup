@extends('layouts.app')

@section('title', 'Dashboard')

@section('content')
    <x-bread-crumb>
        <x-bread-crumb-link is-current="1">
            Dashboard
        </x-bread-crumb-link>
    </x-bread-crumb>
    <div class="row d-flex justify-content-between mb-2"></div>
@endsection
