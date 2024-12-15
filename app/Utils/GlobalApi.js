import { gql, request } from 'graphql-request'

const MASTER_URL = 'https://ap-south-1.cdn.hygraph.com/content/cm4nn41lh00c007uv6zt0of68/master';

const getSlider = async () => {
    const query = gql`
      query GetSlider{
            sliders{
            id
            title
            image {
                id
                url
            }
            }
        }
    `
    const result = await request(MASTER_URL, query)
    return result;
}
const getCategory = async () => {
    const query = gql`
      query GetCategory {
        categories{
            id
            name
            icon {
            url
            }
        }
    }
    `
    const result = await request(MASTER_URL, query)
    return result;
}
const getBusinessList = async () => {
    const query = gql`
        query GetBusinessList {
            businessLists {
                id
                name
                email
                contactPerson
                category {
                name
                }
                address
                about
                images {
                url
                }
            }
        }
    `
    const result = await request(MASTER_URL, query)
    return result;
}
const getBusinessListByCategory = async (category) => {    

    const query = gql`
        query GetBusinessList {
            businessLists(where: {category: {name: "`+category+`"}}) {
                id
                name
                email
                contactPerson
                category {
                name
                }
                address
                about
                images {
                url
                }
            }
        }
    `
    const result = await request(MASTER_URL, query)
    return result;
}

export default {
    getSlider,
    getCategory,
    getBusinessList,
    getBusinessListByCategory
}