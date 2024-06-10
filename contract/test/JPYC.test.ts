import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers"
import { expect } from "chai"
import hre from "hardhat"

describe("JPYC", function() {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployJPYC() {
    const [ owner, user_1 ] = await hre.viem.getWalletClients()

    const jpyc = await hre.viem.deployContract(
      "JPYC",
      [],
    )

    const publicClient = await hre.viem.getPublicClient()

    return {
      jpyc,
      owner,
      user_1,
      publicClient,
    }
  }

  describe("Mint", function() {
    it("Should able to mint", async function() {
      const { jpyc, owner, user_1 } = await loadFixture(deployJPYC)

      expect(
        await jpyc.read.balanceOf([
          owner.account.address,
        ]),
      ).to.be.eq(BigInt(0))

      const tx = await jpyc.write.mint([
        owner.account.address,
        BigInt(1_000),
      ])

      expect(
        await jpyc.read.balanceOf([
          owner.account.address,
        ]),
      ).to.be.eq(BigInt(1_000))
    })
  })
})
