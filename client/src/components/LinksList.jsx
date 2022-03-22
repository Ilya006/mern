import React from 'react'
import { Link } from 'react-router-dom'

export const LinksList = ({ links }) => {

  if (!links.length) {
    return <p>Ссылок нет</p>
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Оригинальная</th>
            <th>Сокращенная</th>
            <th>Открыть</th>
          </tr>
        </thead>

        <tbody>
          {links.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.to}</td>
              <td>{item.from}</td>
              <td>
                {<Link to={`/detail/${item._id}`}>Посмотреть</Link>}
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </>
  )
}
