<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin');
    }

    public function index(Request $request)
    {
        $search = $request->get('search');

        return view('modules.categories.index')
            ->with([
                'categories' => Category::query()
                    ->when($search, fn ($query) => $query->where('name', 'like', "%".$search."%"))
                    ->simplePaginate(10)
            ]);
    }

    public function create()
    {
        return view('modules.categories.edit')
            ->with([
                'action' => route('categories.store'),
                'method' => null,
                'data' => null
            ]);
    }

    public function store(CategoryRequest $request)
    {
        $validated = $request->validated();
        $validated['active'] = $request->has('active');

        $category = Category::create($validated);

        return redirect()
            ->route('categories.edit', $category)
            ->withNotify('success', $category->getAttribute('name'));
    }

    public function show(Category $category)
    {
        return view('modules.categories.edit')
            ->with([
                'action' => null,
                'method' => null,
                'data' => $category
            ]);
    }

    public function edit(Category $category)
    {
        return view('modules.categories.edit')
            ->with([
                'action' => route('categories.update', $category),
                'method' => "PUT",
                'data' => $category
            ]);
    }

    public function update(CategoryRequest $request, Category $category)
    {
        $validated = $request->validated();
        $validated['active'] = $request->has('active');

        $category->update($validated);

        return back()->withNotify('info', $category->getAttribute('name'));
    }

    public function destroy(Category $category)
    {
        if ($category->delete()) {
            return response('OK');
        }
        return response()->setStatusCode('204');
    }
}
