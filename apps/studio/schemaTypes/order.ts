import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      validation: (Rule) => Rule.required().error('Order number is required'),
    }),
    defineField({
      name: 'stripeCheckoutSessionId',
      title: 'Stripe Checkout Session ID',
      type: 'string',
      validation: (Rule) => Rule.required().error('Stripe checkout session ID is required'),
    }),
    defineField({
      name: 'stripeCustomerId',
      title: 'Stripe Customer ID',
      type: 'string',
      validation: (Rule) => Rule.required().error('Stripe customer ID is required'),
    }),
    defineField({
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
      validation: (Rule) => Rule.required().email().error('Valid customer email is required'),
    }),
    defineField({
      name: 'stripePaymentId',
      title: 'Stripe Payment ID',
      type: 'string',
      validation: (Rule) => Rule.required().error('Stripe payment ID is required'),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      validation: (Rule) => Rule.required().error('Currency is required'),
    }),
    defineField({
      name: 'amountDiscount',
      title: 'Amount Discount',
      type: 'number',
      validation: (Rule) =>
        Rule.min(0)
          .precision(2)
          .error('Discount must be a positive number with up to 2 decimal places'),
    }),
    defineField({
      name: 'totalPrice',
      title: 'Total Price',
      type: 'number',
      validation: (Rule) =>
        Rule.required()
          .min(0)
          .precision(2)
          .error('Total price must be a positive number with up to 2 decimal places'),
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Paid', value: 'paid'},
          {title: 'Shipped', value: 'shipped'},
          {title: 'Delivered', value: 'delivered'},
          {title: 'Cancelled', value: 'cancelled'},
        ],
      },
      validation: (Rule) => Rule.required().error('Order status is required'),
    }),
    defineField({
      name: 'orderDate',
      title: 'Order Date',
      type: 'datetime',
      validation: (Rule) => Rule.required().error('Order date is required'),
    }),
  ],
  preview: {
    // shows a preview on sanity studio dashboard
    select: {
      orderNumber: 'orderNumber',
      customerEmail: 'customerEmail',
      totalPrice: 'totalPrice',
      currency: 'currency',
    },
    prepare(selection) {
      const {orderNumber, customerEmail, totalPrice, currency} = selection
      return {
        title: `Order #${orderNumber?.slice(-5)}`,
        subtitle: `${customerEmail} - ${currency?.toUpperCase()} ${totalPrice}`,
      }
    },
  },
})
