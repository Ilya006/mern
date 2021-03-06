import React from 'react'

export const LinkCart = ({ link }) => {
  return (
    <>
      <h2>Сылка</h2>
      <p>Ваша ссылка: <a href={link.to} target='_blank' rel='noopener noreferrer' >{link.to}</a></p>
      <p>Откуда: <a href={link.from} target='_blank' rel='noopener noreferrer' >{link.from}</a></p>
      <p>Количество кликов: 
        <a href={link.clicks} target='_blank' rel='noopener noreferrer' > {link.clicks}</a>
      </p>
      <p>Дата создания: {new Date(link.date).toLocaleDateString()}</p> 
    </>
  )
}