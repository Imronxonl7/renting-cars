'use client'

import { useEffect, useRef, useState } from 'react'
import HeaderAuthActions from '@/components/HeaderAuthActions'
import AuthModal from '@/components/header-auth/AuthModal'
import {
  AUTH_EVENT_NAME,
  OPEN_AUTH_MODAL_EVENT,
  createUser,
  clearStoredUserId,
  findUserByCredentials,
  findUserByEmail,
  getStoredUserId,
  getUserById,
  setStoredUserId,
  type UserRecord,
} from '@/lib/usersAuth'

type HeaderAuthClientProps = {
  mobile?: boolean
}

const HeaderAuthClient = ({ mobile = false }: HeaderAuthClientProps) => {
  const [user, setUser] = useState<UserRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [avatar, setAvatar] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let active = true

    const loadUser = async () => {
      const storedUserId = getStoredUserId()

      if (!storedUserId) {
        if (active) {
          setUser(null)
          setLoading(false)
        }

        return
      }

      try {
        const currentUser = await getUserById(storedUserId)

        if (!active) {
          return
        }

        if (!currentUser) {
          clearStoredUserId()
          setUser(null)
          setLoading(false)
          return
        }

        setUser(currentUser)
      } catch {
        if (active) {
          setUser(null)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    const syncUser = () => {
      setLoading(true)
      void loadUser()
    }

    void loadUser()
    window.addEventListener(AUTH_EVENT_NAME, syncUser)
    window.addEventListener('storage', syncUser)

    return () => {
      active = false
      window.removeEventListener(AUTH_EVENT_NAME, syncUser)
      window.removeEventListener('storage', syncUser)
    }
  }, [])

  useEffect(() => {
    const handleOpenAuthModal = (event: Event) => {
      const customEvent = event as CustomEvent<{ mode?: 'sign-in' | 'sign-up' }>
      openModal(customEvent.detail?.mode ?? 'sign-in')
    }

    window.addEventListener(OPEN_AUTH_MODAL_EVENT, handleOpenAuthModal)

    return () => {
      window.removeEventListener(OPEN_AUTH_MODAL_EVENT, handleOpenAuthModal)
    }
  }, [])

  useEffect(() => {
    if (!modalOpen) {
      return
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!modalRef.current?.contains(event.target as Node)) {
        setModalOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [modalOpen])

  const openModal = (nextMode: 'sign-in' | 'sign-up') => {
    setMode(nextMode)
    setError('')
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setError('')
  }

  const resetFields = () => {
    setName('')
    setEmail('')
    setPhone('')
    setAvatar('')
  }

  const handleModeChange = (nextMode: 'sign-in' | 'sign-up') => {
    setMode(nextMode)
    setError('')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      if (mode === 'sign-in') {
        const existingUser = await findUserByCredentials(email, phone)

        if (!existingUser) {
          setError('Bunday account topilmadi.')
          return
        }

        setStoredUserId(existingUser.id)
        closeModal()
        resetFields()
        return
      }

      const userByEmail = await findUserByEmail(email)

      if (userByEmail) {
        setError('Bu email bilan account allaqachon mavjud.')
        return
      }

      const createdUser = await createUser({ name, email, phone, avatar })

      if (!createdUser) {
        setError('Ro‘yxatdan o‘tishda xatolik yuz berdi.')
        return
      }

      setStoredUserId(createdUser.id)
      closeModal()
      resetFields()
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : mode === 'sign-in'
            ? 'Kirishda xatolik yuz berdi.'
            : 'Ro‘yxatdan o‘tishda xatolik yuz berdi.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <HeaderAuthActions
        mobile={mobile}
        loading={loading}
        user={user}
        onOpenSignIn={() => openModal('sign-in')}
        onOpenSignUp={() => openModal('sign-up')}
      />

      {!user && modalOpen ? (
        <AuthModal
          mode={mode}
          name={name}
          email={email}
          phone={phone}
          avatar={avatar}
          error={error}
          submitting={submitting}
          modalRef={modalRef}
          onClose={closeModal}
          onModeChange={handleModeChange}
          onNameChange={setName}
          onEmailChange={setEmail}
          onPhoneChange={setPhone}
          onAvatarChange={setAvatar}
          onSubmit={handleSubmit}
        />
      ) : null}
    </>
  )
}

export default HeaderAuthClient
