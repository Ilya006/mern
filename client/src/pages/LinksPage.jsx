import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Loader } from '../components/Loader'
import { LinksList } from '../components/LinksList'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const LinksPage = () => {
  const [links, setLinks] = useState([])
  const { request, loading } = useHttp()
  const auth = useContext(AuthContext)

  const getLink = useCallback(async () => {
    try {
      const fetched = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${auth.token}`
      })

      setLinks(fetched)
    } catch (error) { }
  }, [request, auth.token])

  useEffect(() => {
    getLink()
  }, [getLink])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && <LinksList links={links} />}
    </>
  )
}
