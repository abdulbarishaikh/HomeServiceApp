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
    const result = await request(MASTER_URL, mutationQuery)

    return result;
}
const publishedBooking = async (bookingId) => {
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
const getUserdBooking = async (userEmail) => {
    const query = gql`
        query GetUserBookings {
            bookings(
                orderBy: updatedAt_DESC
                where: {userEmail: "${userEmail}"}
            ) {
                time
                userEmail
                userName
                bookingStatus
                date
                id
                business {
                    id
                    images {
                        url
                    }
                    name
                    address
                    contactPerson
                    email
                    about
                    category {
                        name
                    }
                }
            }
        }
    `;
    const result = await request(MASTER_URL, query).catch((error) => console.log('error >>>>>>> ', error));

    return result;
}

export default {
    getSlider,
    getCategory,
    getBusinessList,
    getBusinessListByCategory,
    createBooking,
    publishedBooking,
    getUserdBooking
}