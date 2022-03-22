import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { LinkCart } from '../components/LinkCart';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { Loader } from './../components/Loader'

export const DetailPage = () => {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const linkId = useParams().id;
  const [link, setLink] = useState(null)

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      }) 

      setLink(fetched)
    } catch (error) {}
  }, [linkId, request, token])

  useEffect(() => {
    getLink()
  }, [getLink])

  if(loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && link && <LinkCart link={link} />}
    </>
  )
}
