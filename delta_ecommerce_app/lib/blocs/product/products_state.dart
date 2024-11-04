import 'package:delta_ecommerce_app/data/models/product_model.dart';
import 'package:equatable/equatable.dart';

abstract class ProductsState extends Equatable {
  @override
  List<Object?> get props => [];
}

final class ProductsInitial extends ProductsState {}

final class ProductsLoading extends ProductsState {}

final class ProductsLoaded extends ProductsState {
  final List<ProductModel> products;
  ProductsLoaded({required this.products});

  @override
  List<Object?> get props => [products];
}

final class ProductsLoadingFaild extends ProductsState {
  final String error;
  ProductsLoadingFaild({required this.error});

  @override
  List<Object?> get props => [error];
}
