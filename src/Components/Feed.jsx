import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'
import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'

const Feed = () => {

  const [isLoading, setLoading] = useState(false)

  const feed = useSelector(store => store.feed);
  const dispatch = useDispatch()

  const getFeed = async () => {
    try {
      setLoading(true)
      if (feed) return;
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res?.data?.data));

    } catch (err) {
      toast.error(err?.response?.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getFeed()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>

      {isLoading && 
      <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl animate-pulse">
        <div className="h-48 bg-gray-300 rounded-t-lg"></div>
        <div className="card-body">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>

          <div className="flex justify-center space-x-4 mt-4">
            <div className="h-10 w-24 bg-gray-300 rounded"></div>
            <div className="h-10 w-24 bg-gray-300 rounded"></div>
          </div>
          </div>
        </div>
      </div>}

      {feed &&
        <div className="flex justify-center my-10">
          <UserCard user={feed[0]} />
        </div>}
    </>
  )
}

export default Feed;