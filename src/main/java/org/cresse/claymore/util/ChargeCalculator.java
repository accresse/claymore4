package org.cresse.claymore.util;

public class ChargeCalculator {
	
	public static void calculateOdds(double chance) {
		System.out.println("============================");
		System.out.format("Charge Percentage: %s%%%n", 100*chance);
		System.out.println("============================");
		calculateOdds(chance, 0, 1.0, 0.0);
	}
	
	private static void calculateOdds(double chance, int charges, double cumulativeProb, double expectedValue) {
		double failureChance = Math.min(0.97,Math.max(0.03,1-chance));
		double successChance = 1.0-failureChance;
		double cumulativeProbForThisCharge = failureChance*cumulativeProb;
		expectedValue += cumulativeProbForThisCharge * charges;
		if(cumulativeProb<0.0001) {
			System.out.format("Expected: %s%n", expectedValue);
			return;
		}
		System.out.format("%s: %s%%%n", charges, 100.0*cumulativeProbForThisCharge);
		calculateOdds(chance-0.25, charges+1, successChance*cumulativeProb, expectedValue);
	}
	
	public static void main(String[] args) {
//		calculateOdds(1.0);
//		calculateOdds(2.0);
//		calculateOdds(3.0);
//		calculateOdds(4.0);
//		calculateOdds(5.0);
//		calculateOdds(6.0);
//		calculateOdds(7.0);
//		calculateOdds(8.0);
//		calculateOdds(9.0);
//		calculateOdds(10.0);
//		calculateOdds(11.0);
		calculateOdds(38.0);
	}

}
