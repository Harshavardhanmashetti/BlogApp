"use client"
import React, { useState } from 'react';
import NavBar from "@/components/NavBar/NavBar";
import Link from "next/link";
import Image from "next/image";
import styles from './page.module.css'
import '../auth.css'
import { toast } from 'react-toastify';
import logo from '@/assets/BLOG.png'


interface FormData {
    name: string,
    email: string,
    password: string,
    confirmPassword: string;
}

export default function Signup() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(formData)
        setErrors({});
        const validationErrors: Record<string, string> = {};
        if (!formData.email) {
            validationErrors.email = 'Email is required';
        }
        if (!formData.password) {
            validationErrors.password = 'Password is required';
        }
        if (formData.password !== formData.confirmPassword) {
            validationErrors.confirmPassword = 'password do not match';
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then((res) => {
                return res.json();
            })
            .then((response) => {
                if (response.ok) { 
                    toast.success(response.message, {
                        position: 'top-right',
                        autoClose: 2000 }); 
                } else { 
                    toast.error(response.message,{
                        position: 'top-right',
                         autoClose: 2000 });
                 }
            })
            .catch((err) => {
                toast(err.message, {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 2000
                })
            })
    }
    return (
        <div className="authout">
            <NavBar />
            <div className="authin">
                <div className="left">
                    <Image src={logo} alt='' className='img' />
                </div>
                <div className="right">
                    <form style={{
                        display: "flex",
                        flexDirection: "column"
                    }}
                        onSubmit={handleSubmit}>
                        <div className="forminput_cont">
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Enter Your Name"
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <span className='formerror'>{errors.name}</span>}
                        </div>
                        <div className="forminput_cont">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                name='email'
                                value={formData.email}
                                onChange={handleChange} />
                            {errors.email && <span className='formerror'>{errors.email}</span>}

                        </div>
                        <div className="forminput_cont">
                            <label>Password</label>
                            <input
                                type="text"
                                placeholder="Enter Your Password"
                                name='password'
                                value={formData.password}
                                onChange={handleChange} />
                            {errors.password && <span className='formerror'>{errors.password}</span>}

                        </div>
                        <div className="forminput_cont">
                            <label>Confirm Password</label>
                            <input
                                type="text"
                                placeholder="Re-Enter your Password"
                                name='confirmPassword'
                                value={formData.confirmPassword}
                                onChange={handleChange} />
                            {errors.confirmPassword && <span className='formerror'>{errors.confirmPassword}</span>}
                        </div>
                        <button type="submit" className="main_button">Register</button>
                        <p className="authlink">Already have an account ?<Link href="/pages/auth/signin">Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
}
