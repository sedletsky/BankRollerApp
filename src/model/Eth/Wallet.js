import _config    from 'app.config'
import DB         from 'DB/DB'
import * as Utils from 'utils'

import RPC from './RPC'
const rpc = new RPC( _config.rpc_url )


let ethWallet = false
// in browser connected as external lib
if ( window.lightwallet ) {
	ethWallet = window.lightwallet
}
// for server
if (typeof proccess !== 'undefined') {
	ethWallet = require('eth-lightwallet')
}

let _wallet = {}

export default class Wallet {
	constructor() {
		this.lib = ethWallet

		// Create wallet if not exist
		DB.getItem('wallet', (err, wallet)=>{
			if (wallet) {
				_wallet = wallet
				return
			}

			this.create()
		})
	}

	get(){
		return _wallet
	}

	getKs(){
		if (this.keyStore) {
			return this.keyStore
		}
		this.keyStore = ethWallet.keystore.deserialize( _wallet.keystorage  )
		return this.keyStore
	}

	exportPrivateKey(callback){
		this.getPwDerivedKey( PwDerivedKey => {
			let private_key = this.getKs().exportPrivateKey(_wallet.addr, PwDerivedKey)

			callback(private_key)
		})
	}


	getPwDerivedKey(callback, limit=5){
		if (this.pwDerivedKey) {
			callback(this.pwDerivedKey)
			return
		}
		this.getKs().keyFromPassword(_config.wallet_pass, (err, pwDerivedKey)=>{
			if (err && limit>0 ) { this.getPwDerivedKey(callback, (limit-1)); return }

			if (pwDerivedKey) {
				this.pwDerivedKey = pwDerivedKey
			}
			callback(pwDerivedKey)
		})
	}


	reset(){
		DB.setItem('wallet', null)
	}

	create(callback){
		console.log('Create Wallet')

		let wallet = {}

		ethWallet.keystore.createVault({
			seedPhrase: ethWallet.keystore.generateRandomSeed(),
			password:   _config.wallet_pass
		}, (err, ks)=>{
			if (err) console.error('[Create Wallet] Error: ', err)

			ks.keyFromPassword(_config.wallet_pass, (err, pwDerivedKey)=>{
				if (err) console.error('[Create Wallet] keyFromPassword Error: ', err)

				ks.generateNewAddress(pwDerivedKey, 1)

				wallet.addr         = ks.getAddresses()[0]
				wallet.keystorage   = ks.serialize()
				wallet.openkey      = '0x' + wallet.addr


				console.info('Wallet created!', wallet)

				DB.setItem('wallet', wallet)

				_wallet = wallet

				if (callback) { callback() }

				return
			})
		})
	}

	getNonce(callback){
		if (this.nonce) {
			this.nonce++
			callback('0x'+Utils.numToHex(this.nonce))
			return
		}

		rpc.request('getTransactionCount', [ this.get().openkey, 'pending']).then( response => {
			this.nonce = Utils.hexToNum(response.result.substr(2))

			console.log('nonce:', response.result)
			callback( response.result )
		})
	}


	signTx(options, callback){
		this.getPwDerivedKey( PwDerivedKey => {
			this.getNonce( nonce => {
				options.nonce = nonce

				let signedTx = ethWallet.signing.signTx(
					this.getKs(),
					PwDerivedKey,
					ethWallet.txutils.createContractTx(_wallet.openkey.substr(2), options).tx,
					_wallet.openkey.substr(2)
				)

				callback(signedTx)
			})
		})
	}
}



