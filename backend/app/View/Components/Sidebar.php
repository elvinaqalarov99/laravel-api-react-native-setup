<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Sidebar extends Component
{
    public array $items;

    public function __construct()
    {
        $this->items = (array) [

            (object) [
                'title' => 'Dashboard',
                'icon'  => 'fa fa-home',
                'url'  => route('dashboard'),
            ],

            (object) [
                'title' => 'Categories',
                'icon'  => 'fa fa-list',
                'url'  => route('categories.index'),
            ],
        ];
    }

    public function render(): string
    {
        return /* @lang Blade */
            <<<'blade'
            <ul>
                @foreach($items as $item)
                    @if($item->type ?? '' == "title")
                        <li>
                            <h2 class="text-muted">{{$item->title}}</h2>
                        </li>
                    @else
                        <li @class(['active' => request()->url() == $item->url ]) >
                            <a href="{{$item->url}}">
                                <span class="icon"><i class="{{$item->icon}} mr-2"></i></span>
                                <span class="item">{{$item->title}}</span>
                                @if($item->badge ?? false)
                                    <span class="badge badge-pill badge-{{$item->badge->class}}">{{$item->badge->title}}</span>
                                @endif
                            </a>
                        </li>
                    @endif
                @endforeach
            </ul>
        blade;
    }
}
