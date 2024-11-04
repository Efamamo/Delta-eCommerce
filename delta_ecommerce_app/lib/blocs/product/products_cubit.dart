import 'package:delta_ecommerce_app/blocs/product/products_state.dart';
import 'package:delta_ecommerce_app/data/services/product_services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ProductsCubit extends Cubit<ProductsState> {
  final ProductServices productServices;
  ProductsCubit({required this.productServices}) : super(ProductsInitial());
}
