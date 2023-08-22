import { gql } from '@apollo/client';

export const GET_ME = gql`
  query Query($me: ID!) {
    users(_id: $id) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;