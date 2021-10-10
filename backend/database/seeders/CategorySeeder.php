<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run()
    {
        Category::insert([
            [
                'name' => 'technologies',
                'icon' => 'microchip',
                'icon_type' => 'FontAwesome5',
                'active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 't-shirts',
                'icon' => 'tshirt',
                'icon_type' => 'FontAwesome5',
                'active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
