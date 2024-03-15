$(document).ready(function(){
    // Load products on page load
    loadProducts();

    // Submit form
    $('#productForm').submit(function(e){
        e.preventDefault();
        var productName = $('#productName').val();
        var quantity = $('#quantity').val();
        var price = $('#price').val();

        $.ajax({
            type: 'POST',
            url: 'save_product.php',
            data: {
                productName: productName,
                quantity: quantity,
                price: price
            },
            success: function(response){
                $('#productName').val('');
                $('#quantity').val('');
                $('#price').val('');
                loadProducts();
            }
        });
    });

    // Load products
    function loadProducts(){
        $.ajax({
            url: 'products.json',
            dataType: 'json',
            success: function(data){
                var productList = $('#productList');
                productList.empty();
                var totalValue = 0;
                $.each(data, function(index, product){
                    var total = product.quantity * product.price;
                    totalValue += total;
                    productList.append('<div class="row"><div class="col">' + product.productName + '</div><div class="col">' + product.quantity + '</div><div class="col">' + product.price + '</div><div class="col">' + product.dateTimeSubmitted + '</div><div class="col">' + total + '</div></div>');
                });
                $('#totalValue').html('<h3>Total Value: ' + totalValue + '</h3>');
            }
        });
    }
});
