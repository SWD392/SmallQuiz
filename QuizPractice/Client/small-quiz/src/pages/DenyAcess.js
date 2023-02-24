import React from 'react'
import { useNavigate } from 'react-router-dom';

export const DenyAcess = () => {
    const nagative = useNavigate()
    const handleBack = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        nagative("/");
      };
  return (
    <div>
        DenyAcess
        <button onClick={handleBack}>Back</button>
    </div>
  )
}
