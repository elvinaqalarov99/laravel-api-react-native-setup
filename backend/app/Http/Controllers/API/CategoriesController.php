<?php

namespace App\Http\Controllers\API;

use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Validator;
use App\Http\Resources\CategoryResource;

class CategoriesController extends BaseController
{
    public function index(): JsonResponse
    {
        $categories = Category::all();
        return $this->sendResponse(CategoryResource::collection($categories), 'Categories fetched.');
    }

    public function store(Request $request): JsonResponse
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'required',
            'icon' => 'required'
        ]);
        if($validator->fails()){
            return $this->sendError($validator->errors());
        }
        $blog = Category::create($input);
        return $this->sendResponse(new CategoryResource($blog), 'Post created.');
    }


    public function show($id): JsonResponse
    {
        $blog = Category::find($id);
        if (is_null($blog)) {
            return $this->sendError('Post does not exist.');
        }
        return $this->sendResponse(new CategoryResource($blog), 'Post fetched.');
    }

    public function update(Request $request, Category $blog): JsonResponse
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required',
            'icon' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError($validator->errors());
        }

        $blog->name = $input['name'];
        $blog->icon = $input['icon'];
        $blog->save();

        return $this->sendResponse(new CategoryResource($blog), 'Post updated.');
    }

    public function destroy(Category $blog)
    {
        $blog->delete();
        return $this->sendResponse([], 'Post deleted.');
    }
}
