import React from 'react'

function Register() {

    // Two state items, one for username and one for mobile number
    const [username, setUsername] = React.useState('');
    const [mobile, setMobile] = React.useState('');

    // two state items for username and mobile error
    const [usernameError, setUsernameError] = React.useState('');
    const [mobileError, setMobileError] = React.useState('');

    return (
        <div>
            <h1>Register Page</h1>
            <form>
                <label>Username
                    <input type="text" name="username" 
                        value={username}
                        onChange={(e) => {
                            const value = e.target.value;
                            setUsername(value)
                            // validate username, must be at least 8 char long, must have at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character
                            if (value.length < 8) {
                                setUsernameError('Username must be at least 8 characters long');
                            } else if (!/[A-Z]/.test(value)) {
                                setUsernameError('Username must contain at least one uppercase letter');
                            } else if (!/[a-z]/.test(value)) {
                                setUsernameError('Username must contain at least one lowercase letter');
                            } else if (!/[0-9]/.test(value)) {
                                setUsernameError('Username must contain at least one number');
                            } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                                setUsernameError('Username must contain at least one special character');
                            } else {
                                setUsernameError('');
                            }
                        }}
                    />
                    {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
                </label>

                <label>UK Mobile Number
                    <input type="tel" name="mobile"
                        value={mobile}
                        onChange={(e) => {
                            const value = e.target.value;
                            setMobile(value)
                            // validate UK mobile number, must be 11 digits long and start with 07
                            if (!/^(07\d{9})$/.test(value)) {
                                setMobileError('Mobile number must be 11 digits long and start with 07');
                            } else {
                                setMobileError('');
                            }
                        }}
                    />
                    {mobileError && <p style={{ color: 'red' }}>{mobileError}</p>}
                </label>

                <input type="submit" value="Submit" />
            </form>

        </div>
    )
}

export default Register