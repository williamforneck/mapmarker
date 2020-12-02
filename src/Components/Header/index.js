import React from 'react'

import { BiHelpCircle } from 'react-icons/bi'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import './styles.css'

const Header = () => {
  return (
    <div>
      <div>
        <h1>Syonet App</h1>
        <BiHelpCircle
          className='helpSvg' onClick={() => {
            const sectionWindow = window.document.getElementById('sectionWindow').style
            const divHelp = window.document.getElementById('help').style
            sectionWindow.top = '100px'
            divHelp.zIndex = '11'
            divHelp.opacity = '1'
          }}
        />
      </div>
      <div id='help' className='help'>
        <section id='sectionWindow' className='Window'>
          <AiOutlineCloseCircle
            className='closeIcon' onClick={() => {
              const sectionWindow = window.document.getElementById('sectionWindow').style
              const divHelp = window.document.getElementById('help').style
              sectionWindow.top = '-200px'
              divHelp.zIndex = '-1'
              divHelp.opacity = '0'
            }}
          />
          <h2>Ajuda</h2>
          <p>Adicionando marcadores:</p>
          <li>Clique em qualquer lugar do mapa e digite um nome.</li>
          <p>Clique em um marcador existente para mostrar informações.</p>
        </section>
      </div>
    </div>
  )
}

export default Header
