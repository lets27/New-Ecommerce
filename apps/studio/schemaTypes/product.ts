import {defineField, defineType} from 'sanity'
import {TrolleyIcon} from '@sanity/icons'
export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: 'productName',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(100)
          .error('Product name is required and must be between 2-100 characters'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'productName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
      validation: (Rule) => Rule.required().error('Category is required'),
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Related Products',
      type: 'array',
      of: [{type: 'image'}], // array of images
      validation: (Rule) => Rule.max(5).error('You can add up to 5 related products only'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(500)
          .error('Description is required and must be between 10-500 characters'),
    }),
    defineField({
      name: 'icon',
      title: 'Product Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('Product icon is required'),
    }),
    defineField({
      name: 'stock',
      title: 'Stock-Quantity',
      type: 'number',
      validation: (Rule) =>
        Rule.required().min(0).integer().error('Stock must be a positive integer'),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) =>
        Rule.required()
          .min(0)
          .precision(2)
          .error('Price must be a positive number with up to 2 decimal places'),
    }),
  ],
  preview: {
    // shows a preview on sanity studio dashboard
    select: {
      title: 'productName',
      subtitle: 'category.title',
      media: 'icon',
    },
  },
})
