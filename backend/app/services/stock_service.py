from ..models.product import Product

class StockService:
    @staticmethod
    def check_restock(product: Product) -> bool:
        """
        Calculate if a product needs restock.
        Rule: need_restock = True if available_quantity < 20% of total_quantity.
        """
        if product.total_quantity == 0:
            return True
        
        threshold = product.total_quantity * 0.20
        return product.available_quantity < threshold

    @staticmethod
    def update_restock_status(product: Product):
        """
        Updates the need_restock flag based on logic, unless manually overridden?
        The requirement says 'computed by logic but stored to allow manual override'.
        So we should probably only auto-set it if it's not manually set? 
        Or maybe we just provide a default calculation and allow override.
        For now, let's assume we recalculate on quantity changes.
        """
        # If we want to respect manual override, we might need another flag 'manual_override'.
        # But the requirement says 'need_restock = True if ...'. 
        # And 'Provide manual override API to set need_restock explicitly'.
        # So we can just set it. If the user manually sets it, it stays until the next logic update?
        # Let's assume logic runs on update of quantities.
        
        product.need_restock = StockService.check_restock(product)
