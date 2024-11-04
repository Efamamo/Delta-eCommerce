import 'package:equatable/equatable.dart';

class ProductModel extends Equatable {
  final String id;
  final String name;
  final double price;
  final String mainImage;
  final List<String> subImages;
  final int amount;
  final String description;
  final String category;

  const ProductModel(
      {required this.id,
      required this.name,
      required this.price,
      required this.mainImage,
      required this.subImages,
      required this.amount,
      required this.description,
      required this.category});

  factory ProductModel.fromJson(Map<String, dynamic> json) {
    return ProductModel(
      id: json['_id'],
      name: json['name'],
      price: json['price'],
      mainImage: json['mainImage'],
      subImages: json['subImages'],
      amount: json['amount'],
      description: json['description'],
      category: json['category'],
    );
  }

  @override
  List<Object> get props =>
      [name, price, mainImage, subImages, amount, description, category];
}
