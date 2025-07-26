import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Register from './Register.jsx'

// filepath: c:\Users\dev\Documents\github-copilot\copilot-with-react\src\Register.test.jsx

describe('Register', () => {
    it('shows error for invalid username', () => {
        render(<Register />)
        const usernameInput = screen.getByLabelText(/Username/i)
        fireEvent.change(usernameInput, { target: { value: 'short' } })
        expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument()

        fireEvent.change(usernameInput, { target: { value: 'abcdefgh' } })
        expect(screen.getByText(/one uppercase/i)).toBeInTheDocument()

        fireEvent.change(usernameInput, { target: { value: 'Abcdefgh' } })
        expect(screen.getByText(/one number/i)).toBeInTheDocument()

        fireEvent.change(usernameInput, { target: { value: 'Abcdefg1' } })
        expect(screen.getByText(/one special character/i)).toBeInTheDocument()
    })

    it('shows error for invalid mobile number', () => {
        render(<Register />)
        const mobileInput = screen.getByLabelText(/UK Mobile Number/i)
        fireEvent.change(mobileInput, { target: { value: '1234567890' } })
        expect(screen.getByText(/11 digits long and start with 07/i)).toBeInTheDocument()

        fireEvent.change(mobileInput, { target: { value: '071234567' } })
        expect(screen.getByText(/11 digits long and start with 07/i)).toBeInTheDocument()

        fireEvent.change(mobileInput, { target: { value: '08123456789' } })
        expect(screen.getByText(/11 digits long and start with 07/i)).toBeInTheDocument()
    })

    it('clears username error for valid username', () => {
        render(<Register />)
        const usernameInput = screen.getByLabelText(/Username/i)
        fireEvent.change(usernameInput, { target: { value: 'Abcdefg1!' } })
        expect(screen.queryByText(/Username must/i)).not.toBeInTheDocument()
    })

    it('clears mobile error for valid mobile number', () => {
        render(<Register />)
        const mobileInput = screen.getByLabelText(/UK Mobile Number/i)
        fireEvent.change(mobileInput, { target: { value: '07123456789' } })
        expect(screen.queryByText(/Mobile number must/i)).not.toBeInTheDocument()
    })
})