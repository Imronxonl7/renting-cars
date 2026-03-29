import { ImageResponse } from 'next/og'

export const alt = 'Renting Cars - Premium Avto Ijara'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background:
            'linear-gradient(135deg, #141311 0%, #1d1b18 48%, #2a2419 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at top right, rgba(237,180,88,0.20), transparent 34%), radial-gradient(circle at bottom left, rgba(237,180,88,0.14), transparent 30%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            right: -80,
            bottom: -110,
            width: 430,
            height: 430,
            borderRadius: 9999,
            background: 'rgba(237,180,88,0.08)',
            border: '1px solid rgba(237,180,88,0.18)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            padding: '54px 64px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 9999,
                  background: '#edb458',
                  display: 'flex',
                }}
              />
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  letterSpacing: -0.8,
                  display: 'flex',
                }}
              >
                Renting Cars
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 9999,
                padding: '10px 18px',
                fontSize: 18,
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              Premium Car Rental
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: 760,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 20,
                letterSpacing: '0.34em',
                textTransform: 'uppercase',
                color: '#edb458',
                marginBottom: 24,
              }}
            >
              Premium Avto Ijara
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: 74,
                fontWeight: 900,
                lineHeight: 1.02,
                letterSpacing: -2.4,
                marginBottom: 24,
                maxWidth: 920,
              }}
            >
              Hashamatli mashinani tanlang, qulay bron qiling, bemalol yo‘lga chiqing.
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: 28,
                lineHeight: 1.45,
                color: 'rgba(255,255,255,0.72)',
                maxWidth: 820,
              }}
            >
              Sport, SUV va premium klass avtomobillar bir platformada. Zamonaviy ko‘rinish,
              tezkor bron va alohida xizmat.
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: 18,
              }}
            >
              {['Luxury', 'Sport', 'SUV', 'VIP Service'].map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 9999,
                    border: '1px solid rgba(255,255,255,0.12)',
                    padding: '12px 20px',
                    fontSize: 20,
                    color: 'rgba(255,255,255,0.86)',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 9999,
                background: '#edb458',
                color: '#171512',
                padding: '14px 24px',
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              renting-cars
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
