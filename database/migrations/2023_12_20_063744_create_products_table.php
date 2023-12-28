<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('parent_category_id');
            $table->integer('category_id');
            $table->integer('size_id');
            $table->integer('regular_price');
            $table->integer('sell_price');
            $table->integer('sku');
            $table->integer('brand_id');
            $table->longText('model');
            $table->integer('slug');
            $table->longText('product_image');
            $table->longText('short_desc');
            $table->string('keywords');
            $table->string('warranty');
            $table->integer('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
