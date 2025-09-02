import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Env } from 'src/env'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true })
        const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        }
      },
    }),
  ],
})
export class AuthModule {}

// @Module({
//   imports: [
//     PassportModule,
//     JwtModule.registerAsync({
//       inject: [],
//       useFactory() {
//         const privateKey = readFileSync(
//           join(__dirname, '../../keys/private_key.pem'),
//           'utf8',
//         )
//         const publicKey = readFileSync(
//           join(__dirname, '../../keys/public_key.pem'),
//           'utf8',
//         )

//         return {
//           signOptions: { algorithm: 'RS256' },
//           privateKey,
//           publicKey,
//         }
//       },
//     }),
//   ],
//   exports: [JwtModule],
// })
// export class AuthModule {}
