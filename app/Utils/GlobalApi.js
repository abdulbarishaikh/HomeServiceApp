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
    `;
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
    `;
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
    `;
    const result = await request(MASTER_URL, query)
    return result;
}
const getBusinessListByCategory = async (category) => {

    const query = gql`
        query GetBusinessList {
            businessLists(where: {category: {name: "`+ category + `"}}) {
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
    `;
    const result = await request(MASTER_URL, query)
    return result;
}
const createBooking = async (data) => {
    console.log('data >>>>>>> ', data);
    const mutationQuery = gql`
        mutation createBooking {
            createBooking(
                data: {
                    bookingStatus: booked, 
                    business: {
                        connect: {
                            id: "`+ data.businessId + `"
                        }
                    }, 
                    date: "`+ data.date + `", 
                    time: "`+ data.time + `", 
                    userEmail: "`+ data.userEmail + `", 
                    userName: "`+ data.userName + `"
                }
            ) {
                id
            }
        }
    `;
    console.log('result >>>>>>> ');
    const result = await request(MASTER_URL, mutationQuery)

    return result;
}
const publishedBooking = async (bookingId) => {
    console.log('bookingId >>>>>>> ', `{id: "` + bookingId + `"`);
    const mutationQuery = gql`
        mutation createBooking {
            publishBooking(where: {id: "` + bookingId + `"}, to: PUBLISHED) {
                id
                stage
                userName
            }
        }
    `;
    const result = await request(MASTER_URL, mutationQuery).catch((error) => console.log('error >>>>>>> ', error));

    return result;
}

export default {
    getSlider,
    getCategory,
    getBusinessList,
    getBusinessListByCategory,
    createBooking,
    publishedBooking
}